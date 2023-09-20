// (function () {
//   //target element where posts will be displayed
//   let blogPosts = $("#posts");
//
//   //declared variable where I will store the HTML to be displayed on the page
//   let insertPosts = "";
//
//   //ajax request, grabs the data that I will use to create the posts
//   $.ajax("data/blog.json").done(function (data) {
//     //sanity check
//     console.log(data);
//
//     //loops through the array of objects
//     for (let i = 0; i < data.length; i++) {
//       insertPosts += `<div class="d-flex flex-column align-items-center rounded m-2 p-4 bg-dark bg-opacity-75 text-white w-75">`;
//       insertPosts += `<h3 class="text-primary fs-1">${data[i].title}</h3>`;
//       insertPosts += `<p>${data[i].date}</p>`;
//       insertPosts += `<p>${data[i].content}</p>`;
//       insertPosts += `<p class="text-capitalize">Category: ${data[i].categories}</p>`;
//       insertPosts += `</div>`;
//     }
//
//     //Displays the data stored in the insertPosts variable inside of the targeted element
//     blogPosts.html(insertPosts);
//   });
// })();

const getBlogs = async () => {
  const url = "data/blog.json";
  const options = {
    method: "GET",
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const renderBlogPosts = (blog, target) => {
  const blogDiv = document.createElement("div");
  const blogModal = document.createElement("modal");

  blogDiv.innerHTML = `
      <div class="d-flex flex-column align-items-center rounded m-2 p-4 bg-dark bg-opacity-75 text-white w-75">
      <h3 class="text-primary fs-1">${blog.title}</h3>
      <p>${blog.date}</p>
      <p>${blog.content}</p>
      <p class="text-capitalize">Category: ${blog.categories}</p>
      <button id="delete">delete</button>
      <button id ="edit">Edit</button>
      </div>
    `;

  // blogModal.innerHTML = `
  // <div class="d-flex flex-column align-items-center rounded m-2 p-4 bg-dark bg-opacity-75 text-white w-75">
  //     <h3 class="text-primary fs-1">${blog.title}</h3>
  //     <p>${blog.date}</p>
  //     <p contenteditable="true">${blog.content}</p>
  //     <p class="text-capitalize">Category: ${blog.categories}</p>
  //     <button id="close-modal">close</button>
  //      <button id="submit-modal">subit</button>
  //     </div>
  // `;

  const deleteButton = blogDiv.querySelector("#delete");
  deleteButton.addEventListener("click", () => {
    blogDiv.remove();
  });

  const editButton = blogDiv.querySelector("#edit");
  editButton.addEventListener("click", () => {
    target.appendChild(blogModal);
    target.removeChild(blogDiv);
  });

  // const closeModalButton = document.querySelector("#close-modal");
  // closeModalButton.addEventListener("click", () => {
  //   target.removeChild(blogModal);
  //   target.appendChild(blogDiv);
  // });
  //
  // const submitModalButton = document.querySelector("#submit-modal");

  target.appendChild(blogDiv);
};

// const closeModalButton = document.querySelector("#close-modal");
// const closeModalButton = document.querySelector("#submit-modal")
(async () => {
  const displayBlogPosts = document.getElementById("posts");

  let blogs = await getBlogs();
  console.log(blogs);

  blogs.forEach((blog) => {
    renderBlogPosts(blog, displayBlogPosts);
  });
})();
