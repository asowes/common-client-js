import React from "react";
import Button from "/originLib/components/Button";

function ExButton() {
  return (
    <>
      {/* 隐藏input 的 value */}
      <form name="form">
        <input name="pwd" type="password" />
        <button
          type="submit"
          onClick={() => {
            const form = document.forms["form"];
            form.onsubmit = function (e) {
              e.preventDefault();
              const select = document.form["pwd"].value;
              console.log(select);
            };
          }}
        >
          submit
        </button>
      </form>

      <Button />
    </>
  );
}

export default ExButton;
