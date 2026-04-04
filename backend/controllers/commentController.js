const prisma = require('../prisma/client');

exports.createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const authorId = req.user.id;

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(postId),
        authorId,
      },
      include: {
        author: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Security check: Is the post public or owned by the user?
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) }
    });

    if (!post || (!post.isPublic && post.authorId !== userId)) {
      return res.status(403).json({ error: 'Unauthorized to view comments' });
    }

    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
      include: {
        author: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
        replies: {
          include: {
            author: { select: { id: true, firstName: true, lastName: true, avatar: true } },
            likes: { include: { user: { select: { id: true, firstName: true, lastName: true } } } },
            _count: { select: { likes: true } }
          }
        },
        likes: {
          include: { user: { select: { id: true, firstName: true, lastName: true } } }
        },
        _count: { select: { likes: true, replies: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createReply = async (req, res) => {
  try {
    const { commentId, content } = req.body;
    const authorId = req.user.id;

    const reply = await prisma.reply.create({
      data: {
        content,
        commentId: parseInt(commentId),
        authorId,
      },
      include: {
        author: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
      },
    });

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
