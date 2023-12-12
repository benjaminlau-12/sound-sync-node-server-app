import * as dao from "./dao.js";

function LikesRoutes(app) {
  const findAllLikes = async (req, res) => {};
  const createUserLikesAlbum = async (req, res) => {
    const userId = req.params.userId;
    const mediaId = req.params.mediaId;
    const likes = await dao.createUserLikesAlbum(userId, mediaId);
    res.json(likes);
  };
  const deleteUserLikesAlbum = async (req, res) => {};
  const findUsersThatLikeAlbum = async (req, res) => {
    const mediaId = req.params.mediaId;

    const likes = await dao.findUsersThatLikeAlbum(mediaId);
    res.json(likes);
  };
  const findAlbumsThatUserLikes = async (req, res) => {
    const userId = req.params.userId;
    const likes = await dao.findAlbumsThatUserLikes(userId);
    res.json(likes);
  };
  app.get("/api/likes", findAllLikes);
  app.post("/api/users/:userId/likes/:mediaId", createUserLikesAlbum);
  app.delete("/api/users/:userId/likes/:mediaId", deleteUserLikesAlbum);
  app.get("/api/likes/:mediaId/users", findUsersThatLikeAlbum);
  app.get("/api/users/:userId/likes", findAlbumsThatUserLikes);
}

export default LikesRoutes;