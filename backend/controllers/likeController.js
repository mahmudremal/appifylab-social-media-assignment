const prisma = require('../prisma/client');

exports.toggleLike = async (req, res) => {
  try {
    const { postId, commentId, replyId } = req.body;
    const userId = req.user.id;

    let whereClause = { userId };
    if (postId) whereClause.postId = parseInt(postId);
    else if (commentId) whereClause.commentId = parseInt(commentId);
    else if (replyId) whereClause.replyId = parseInt(replyId);
    else return res.status(400).json({ error: 'Post, Comment or Reply ID is required' });

    const existingLike = await prisma.like.findFirst({
      where: whereClause
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      return res.json({ message: 'Unliked successfully' });
    } else {
      const like = await prisma.like.create({
        data: {
          userId,
          postId: postId ? parseInt(postId) : null,
          commentId: commentId ? parseInt(commentId) : null,
          replyId: replyId ? parseInt(replyId) : null,
        }
      });
      return res.status(201).json(like);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
