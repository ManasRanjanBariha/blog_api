const express=require('express');
const authenticateToken=require('../middleware/authMiddleware')
const {createBlog,getBlog,getAllBlogs,editBlog,deleteBlog, createComment,getComment, editComment,getAllCommentOfBlog,deleteComment}=require('../controllers/blogController')
const router=express.Router();

// blog routes
router.post('/',authenticateToken,createBlog);
router.get('/',authenticateToken,getAllBlogs);
router.get('/:id',authenticateToken,getBlog);
router.put('/:id',authenticateToken,editBlog);
router.delete('/:id',authenticateToken,deleteBlog)

//comments roues
router.get('/:id/comment',authenticateToken,getAllCommentOfBlog);
router.post('/:id/comment',authenticateToken,createComment);
router.get('/:id/comment/:comment_id',authenticateToken,getComment);
router.put('/:id/comment/:comment_id',authenticateToken,editComment);
router.delete('/:id/comment/:comment_id',authenticateToken,deleteComment);

module.exports=router;
