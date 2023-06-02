"use strict";
//dom selection
let personal_info_con = document.querySelector(".personal_info");
let input_name = document.querySelector(".name");
let input_email = document.querySelector(".email");
let input_number = document.querySelector(".number");

let select_plan_con = document.querySelector(".select_plan");
let monthly_plans = document.querySelector(".monthly_plan_section");
let yearly_plans = document.querySelector(".yearly_plan_section");
let plans = document.querySelectorAll(".plans_con > .box");
let switch_btn_con = document.querySelector(".switch_btn");
let switch_btn = document.querySelector(".switch_btn > .btn-con");

let pick_addons_con = document.querySelector(".pick_addons_section");
let add_ons = document.querySelectorAll(
  ".pick_addons_section .txt .box_con .box"
);

let summary_con = document.querySelector(".summary_section");
let heading = document.querySelector(".heading");
let thanks_section = document.querySelector(".thanks_section");

let nav1 = document.querySelector(".nav1");
let nav2 = document.querySelector(".nav2");
let nav3 = document.querySelector(".nav3");
let nav4 = document.querySelector(".nav4");

//btn selection
let first_next = document.querySelector(".next_1");
let second_next = document.querySelector(".next_2");
let third_next = document.querySelector(".next_3");
let confirm_btn = document.querySelector(".confirm_btn");

let back_1 = document.querySelector(".back_1");
let back_2 = document.querySelector(".back_2");
let back_3 = document.querySelector(".back_3");
let change_plan_btn = document.querySelector(".change_plan");

// btn functions
first_next.addEventListener("click", open_form_2);
second_next.addEventListener("click", open_form_3);
third_next.addEventListener("click", open_form_4);

let verifeid_inputs = [];
let selected_plan_data = [];
let select_add_ons_data = [];
let total = 0;

// functions
function verify_input_fields() {
  //name
  if (input_name.value === "") {
    let con = input_name.parentElement;
    let err = con.querySelector(".err");
    err.textContent = "This field is required";
    verifeid_inputs[0] = "false";
  } else {
    let con = input_name.parentElement;
    let err = con.querySelector(".err");
    err.textContent = "";
    verifeid_inputs[0] = "true";
  }

  //email
  if (input_email.value === "") {
    let con = input_email.parentElement;
    let err = con.querySelector(".err");
    err.textContent = "This field is required";
    verifeid_inputs[1] = "false";
  } else if (input_email.value.includes("@") === false) {
    let con = input_email.parentElement;
    let err = con.querySelector(".err");
    err.textContent = "Must include '@' ";
    verifeid_inputs[1] = "false";
  } else {
    let con = input_email.parentElement;
    let err = con.querySelector(".err");
    err.textContent = "";
    verifeid_inputs[1] = "true";
  }

  //phone
  if (input_number.value === "") {
    let con = input_number.parentElement;
    let err = con.querySelector(".err");
    err.textContent = "This field is required";
    verifeid_inputs[2] = "false";
  } else if (
    input_number.value.length < 9 ||
    isNaN(Number(input_number.value))
  ) {
    let con = input_number.parentElement;
    let err = con.querySelector(".err");
    err.textContent = "Must be a valid number";
    verifeid_inputs[2] = "false";
  } else {
    let con = input_number.parentElement;
    let err = con.querySelector(".err");
    err.textContent = "";
    verifeid_inputs[2] = "true";
  }
}
switch_btn.addEventListener("click", function () {
  switch_btn_con.classList.toggle("active");
  monthly_plans.classList.toggle("remove");
  yearly_plans.classList.toggle("remove");
});
function uncheck_plans() {
  plans.forEach((i) => {
    i.classList.remove("active");
  });
}

function open_form_2() {
  verify_input_fields();

  if (
    verifeid_inputs[0] === "true" &&
    verifeid_inputs[1] === "true" &&
    verifeid_inputs[2] === "true"
  ) {
    personal_info_con.classList.add("remove");
    select_plan_con.classList.remove("remove");
    nav2.classList.add("active");
    nav1.classList.remove("active");
  }
}

plans.forEach(function (i) {
  i.addEventListener("click", function () {
    uncheck_plans();
    i.classList.add("active");
  });
});

function open_form_3() {
  plans.forEach((i) => {
    if (i.classList.contains("active")) {
      let plan_name = i.querySelector(".plan_name");
      let plan_price = i.querySelector(".plan_price");
      let category = i.getAttribute("category");

      selected_plan_data = [
        plan_name.textContent,
        plan_price.textContent,
        category,
      ];

      select_plan_con.classList.add("remove");
      pick_addons_con.classList.remove("remove");
      nav2.classList.remove("active");
      nav3.classList.add("active");
    }
  });
}

add_ons.forEach(function (i) {
  let checkbox_btn = i.querySelector("input");
  checkbox_btn.addEventListener("click", function () {
    i.classList.toggle("active");
  });
});

function open_form_4() {
  add_ons.forEach((i) => {
    if (i.classList.contains("active")) {
      let add_ons_name = i.querySelector(".add_ons_name").textContent;
      let add_ons_price = i.querySelector(".add_ons_price").textContent;
      select_add_ons_data.push(add_ons_price);
      let newdiv = document.createElement("div");
      let html = `
                   <div class="box">
                    <p>${add_ons_name}</p>
                    <p>${add_ons_price}</p>
                  </div>
        `;
      newdiv.innerHTML = html;
      let parentEl = summary_con.querySelector(".box_con");
      parentEl.append(newdiv);
      total += Number(add_ons_price.slice(3, -4));
    }
  });
  summarize();
  pick_addons_con.classList.add("remove");
  summary_con.classList.remove("remove");
  nav3.classList.remove("active");
  nav4.classList.add("active");
}

function summarize() {
  let headname = heading.querySelector("h4");
  headname.textContent = `${selected_plan_data[0]}(${selected_plan_data[2]})`;

  let headprice = heading.querySelector(".price");
  headprice.textContent = `${selected_plan_data[1]}`;

  let totaltxt = document.querySelector(".total_con p");
  totaltxt.textContent = `Total(per ${selected_plan_data[2].slice(0, -2)})`;

  total += Number(selected_plan_data[1].slice(1, -3));

  let total_price = document.querySelector(".total_con h4");
  total_price.textContent = `+$${total}/${
    selected_plan_data[2] === "yearly" ? "yr" : "mo"
  }`;
}

back_1.addEventListener("click", function () {
  personal_info_con.classList.remove("remove");
  select_plan_con.classList.add("remove");
  nav2.classList.remove("active");
  nav1.classList.add("active");
});

back_2.addEventListener("click", function () {
  select_plan_con.classList.remove("remove");
  pick_addons_con.classList.add("remove");
  nav2.classList.add("active");
  nav3.classList.remove("active");
});

back_3.addEventListener("click", function () {
  let El = summary_con.querySelectorAll(".box_con > div");
  total = 0;
  El.forEach((i) => {
    i.remove();
    console.log(i);
  });
  pick_addons_con.classList.remove("remove");
  summary_con.classList.add("remove");
  nav3.classList.add("active");
  nav4.classList.remove("active");
});

change_plan_btn.addEventListener("click", function () {
  let El = summary_con.querySelectorAll(".box_con > div");
  total = 0;
  El.forEach((i) => {
    i.remove();
  });

  summary_con.classList.add("remove");
  nav4.classList.remove("active");
  select_plan_con.classList.remove("remove");
  nav2.classList.add("active");
});

confirm_btn.addEventListener("click", function () {
  thanks_section.classList.remove("remove");
  summary_con.classList.add("remove");

  //initialize all
  setTimeout(function () {
    thanks_section.classList.add("remove");
    personal_info_con.classList.remove("remove");
    nav4.classList.remove("active");
    nav1.classList.add("active");

    let El = summary_con.querySelectorAll(".box_con > div");
    total = 0;
    El.forEach((i) => {
      i.remove();
    });
    add_ons.forEach(function (i) {
      i.classList.remove("active");
      let checkbox_btn = i.querySelector("input");
      checkbox_btn.checked = false;
    });
    uncheck_plans();

    input_email.value = "";
    input_name.value = "";
    input_number.value = "";
  }, 3000);
});
