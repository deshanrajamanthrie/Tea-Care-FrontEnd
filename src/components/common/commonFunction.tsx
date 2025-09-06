import { AlertTriangle, Check, X } from "react-feather";
import { toast, ToastContainer } from "react-toastify";

type ToastType = 0 | 1 | 2;

export const customToastMsg = (message: string, type: ToastType) => {
  let msgType: "info" | "success" | "error" = "info";

  let assets = {
    color: "bg-info",
    icon: <AlertTriangle color={"#3f3d3d"} size={15} />,
  };

  if (type === 2) {
    msgType = "info";
    assets = {
      color: "bg-warning",
      icon: <AlertTriangle color={"#3f3d3d"} size={15} />,
    };
  } else if (type === 0) {
    msgType = "error";
    assets = {
      color: "bg-danger",
      icon: <X size={15} color={"#680000"} />,
    };
  } else if (type === 1) {
    msgType = "success";
    assets = {
      color: "bg-success",
      icon: <Check color={"#10df10"} size={15} />,
    };
  }
  toast[msgType](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const onlyFirstLetterCapitalFn = (text: string | any) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};
