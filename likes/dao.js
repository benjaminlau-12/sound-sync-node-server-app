import model from "./model.js";

export const findAllLikes = () => model.find();
export const createUserLikesAlbum = (userId, mediaId) =>
  model.create({ user: userId, mediaId: mediaId });
export const deleteUserLikesAlbum = (userId, mediaId) =>
  model.deleteOne({ user: userId, mediaId: mediaId });
export const findUsersThatLikeAlbum = (mediaId) =>
  model.find({ mediaId: mediaId }).populate("user");
export const findAlbumsThatUserLikes = (userId) => model.find({ user: userId });