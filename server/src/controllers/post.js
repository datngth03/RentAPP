import * as postService from "../services/post";

export const getPosts = async (req, res) => {
   try {
      const response = await postService.getPostsService();
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         err: -1,
         msg: "Failed at post controller: " + error,
      });
   }
};
export const getPostsLimit = async (req, res) => {
   const { page, priceNumber, areaNumber, ...query } = req.query;

   try {
      const response = await postService.getPostsLimitService(page, query, {
         priceNumber,
         areaNumber,
      });
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         err: -1,
         msg: "Failed at post controller: " + error,
      });
   }
};
export const getNewPosts = async (req, res) => {
   try {
      const response = await postService.getNewPostService();
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         err: -1,
         msg: "Failed at post controller: " + error,
      });
   }
};
export const createNewPost = async (req, res) => {
   try {
      const { categoryCode, title, priceNumber, areaNumber, label } = req.body;
      const { id } = req.user;
      if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label)
         return res.status(400).json({
            err: 1,
            msg: "Missing input",
         });
      const response = await postService.createNewPostService(req.body, id);
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         err: -1,
         msg: "Failed at post controller: " + error,
      });
   }
};

export const getPostsLimitAdmin = async (req, res) => {
   const { page, ...query } = req.query;
   const { id } = req.user;
   try {
      if (!id)
         return res.status(400).json({
            err: 1,
            msg: "Missing input",
         });
      const response = await postService.getPostsLimitAdminService(id, page, query);
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         err: -1,
         msg: "Failed at post controller: " + error,
      });
   }
};

export const updatePostAdmin = async (req, res) => {
   const { postId, attributesId, imagesId, featureId, ...body } = req.body;
   try {
      if (!postId || !attributesId || !imagesId || !featureId)
         return res.status(400).json({
            err: 1,
            msg: "Missing update inputs",
         });
      const response = await postService.updatePostService(req.body);
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         err: -1,
         msg: "Failed at post controller: " + error,
      });
   }
};

export const deletePostAdmin = async (req, res) => {
   const { postId } = req.query;
   try {
      if (!postId)
         return res.status(400).json({
            err: 1,
            msg: "Missing delete inputs",
         });
      const response = await postService.deletePostService(postId);
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         err: -1,
         msg: "Failed at post controller: " + error,
      });
   }
};
