import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function AdminWrapper() {
  const token = useSelector((state) => state.misc.token);

  return (
    <>
      {token && token.role === "admin" ? (
        <Outlet></Outlet>
      ) : (
        <p className="text-40px font-medium mt-12 text-center">
          Not Authorized
        </p>
      )}
    </>
  );
}
