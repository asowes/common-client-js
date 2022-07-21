import React, { useEffect } from "react";
import {
  updateAddress,
  changeDeposit,
} from "/originLib/redux/slices/userSlice";
import { updateUserId } from "/originLib/redux/slices/localStoreSlice";
import { useSelector, useDispatch } from "/originLib/redux";

function ExRedux() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const store = useSelector((state) => state.store);

  useEffect(() => {
    console.log(user);
  }, []);

  const _updateAddress = () => {
    dispatch(updateAddress("深圳湾壹号"));
  };

  const _changeDeposit = (type) => {
    if (type === "add") {
      dispatch(changeDeposit(user.deposit + 1000));
    } else {
      dispatch(changeDeposit(user.deposit - 1000));
    }
  };

  const _updateUserId = () => {
    dispatch(updateUserId(store.userId + 1));
  };

  return (
    <React.Fragment>
      <button onClick={_updateAddress}>修改地址</button>
      <div style={{ marginBottom: 32 }} />
      <button onClick={() => _changeDeposit("add")}>增加存款1000</button>
      <div style={{ marginBottom: 32 }} />
      <button onClick={() => _changeDeposit("subtract")}>减少存款1000</button>
      <div style={{ marginBottom: 32 }} />
      <div>当前地址：{user.address}</div>
      <div style={{ marginBottom: 32 }} />
      <div>当前存款: {user.deposit}</div>
      <div style={{ marginBottom: 32 }} />
      <button onClick={_updateUserId}>修改用户id</button>
      <div style={{ marginBottom: 32 }} />
      <div>用户id: {store?.userId}</div>
    </React.Fragment>
  );
}

export default ExRedux;
