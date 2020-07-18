import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = new mongoose.model("User", UserSchema);
//model은 데이터베이스에서 데이터를 읽고 생성하고 수정하는 프로그래밍 인터페이스를 정의한다
export default model;
