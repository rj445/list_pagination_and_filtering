const student_list = document.querySelector(".student-list").children;

const student_list_to_filter = [];

for(let studentIndex = 0; studentIndex < student_list.length; studentIndex++) {
   student_list_to_filter.push(student_list[studentIndex]);
} 

const students_per_page = 10;

function changeStudentListTo(student_list) {
   const student_list_container = document.querySelector(".student-list");
   student_list_container.innerHTML = "";
   for(let studentIndex = 0; studentIndex < student_list.length; studentIndex++) {
      student_list_container.appendChild(student_list[studentIndex]);
   } 
}

function showPage(student_list, pageNumber) {
   let start_index = pageNumber * students_per_page - students_per_page;
   let end_index = pageNumber * students_per_page - 1;
   let numberOfStudents = student_list.length;
   end_index = (end_index > ( numberOfStudents - 1)) ? (numberOfStudents - 1) : end_index;
   for(let studentIndex = 0; studentIndex < numberOfStudents; studentIndex++) {
      if (studentIndex < start_index || studentIndex > end_index) {
         student_list[studentIndex].style.display = 'none';
      } else {
         student_list[studentIndex].style.display = '';
      }
   } 
}

function appendPageLinks(student_list) {
   const mainPage = document.querySelector(".page");

   const paginationLinks = document.querySelector(".pagination");
   if (paginationLinks)
      mainPage.removeChild(paginationLinks);

   let totalPageCount =  Math.ceil(student_list.length/ students_per_page);
   const pageNumberListContainer = document.createElement("div");
   pageNumberListContainer.className = "pagination";
   const pageNumberList = document.createElement("ul");
   for(let pageNumber = 1; pageNumber <= totalPageCount; pageNumber++) {
      pageNumberListItem = document.createElement("li");
      const pageNumberListItemLink = document.createElement("a");
      pageNumberListItemLink.href = "#";
      if (pageNumber === 1) {
         pageNumberListItemLink.className = "active";
      }
      pageNumberListItemLink.textContent = pageNumber;
      pageNumberListItemLink.addEventListener('click', function (event) {
         event.preventDefault();
         for (let pageListItemIndex = 0; 
            pageListItemIndex < pageNumberList.children.length; 
            pageListItemIndex++) {
               pageNumberList.children[pageListItemIndex].children[0].className = "";
         }
         event.target.className = "active";
         showPage(student_list, parseInt(event.target.textContent));
      });
      pageNumberListItem.appendChild(pageNumberListItemLink);
      pageNumberList.appendChild(pageNumberListItem);
   }
   pageNumberListContainer.appendChild(pageNumberList);
   mainPage.appendChild(pageNumberListContainer);
   
}

function appendSearchBox() {
   const pageHeaderElement = document.querySelector(".page-header");
   const searchBoxContainer = document.createElement("div");
   searchBoxContainer.className = "student-search";
   
   const searchField = document.createElement("input");
   searchField.type = "text";
   searchField.placeholder = "Search for students...";

   searchField.addEventListener('keyup', function(event) {
      filterStudentList(student_list_to_filter, event.target.value);
   });

   const searchButton = document.createElement("button");
   searchButton.textContent = "search";

   searchButton.addEventListener('click', function() {
      filterStudentList(student_list_to_filter, searchField.value);
   });
   searchBoxContainer.appendChild(searchField);
   searchBoxContainer.appendChild(searchButton);

   pageHeaderElement.appendChild(searchBoxContainer);
}


function filterStudentList(student_list, student_name) {
   
   let filtered_list = [];
   for(let student_index=0; student_index < student_list.length; student_index++) {
      if (student_list[student_index].querySelector("h3").innerHTML.includes(student_name)) {
         filtered_list.push(student_list[student_index]);
      }
   }

   changeStudentListTo(filtered_list);

   appendPageLinks(filtered_list);

   showPage(filtered_list, 1);
}

appendSearchBox();
filterStudentList(student_list_to_filter, '')