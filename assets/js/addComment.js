import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentsList = document.getElementById("jsCommentsList");
const commentsNumber = document.getElementById("jsCommentsNumber");

const increaseNumber = () => {
  commentsNumber.innerHTML = parseInt(commentsNumber.innerHTML, 10) + 1;
};
const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentsList.prepend(li);
  increaseNumber();
};
const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    data: { comment },
    method: "post",
  });
  if (response.status === 200) {
    addComment(comment);
  }
};
const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};
function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
