const prisma = require('../prisma/client');

exports.createPost = async (req, res) => {
  try {
    const { content, isPublic } = req.body;
    const authorId = req.user.id;
    let image = null;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const post = await prisma.post.create({
      data: {
        content,
        image,
        isPublic: isPublic === 'true' || isPublic === true,
        authorId,
      },
      include: {
        author: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    
    // Millions of posts: In a real app we'd use pagination.
    // Assuming millions of posts, we need to handle that. 
    // I'll add basic pagination support.
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { isPublic: true },
          { authorId: currentUserId },
        ],
      },
      include: {
        author: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
        likes: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true } }
          }
        },
        _count: {
          select: { comments: true, likes: true }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.authorId !== authorId) return res.status(403).json({ error: 'Unauthorized' });

    await prisma.post.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
