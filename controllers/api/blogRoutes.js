const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log('check');
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const commentData = await Comment.findAll();

//     // Serialize data so the template can read it
//     const comments = commentData.map((comment) => comment.get({ plain: true }));


//     res.render('blog', {
//       ...comments,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
