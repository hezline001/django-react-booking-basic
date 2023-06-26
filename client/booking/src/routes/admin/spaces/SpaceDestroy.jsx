import { redirect } from "react-router-dom";
import axios from "../../../axios/axios";

export async function spaceDestroy({ params }) {
  try {
    let response = axios.delete(`/spaces/destroy/${params.spaceId}/`, {
      withCredentials: true,
    });
    return redirect("/admin/spaces");
  } catch (e) {
    if (e.response) {
      if ((e.response.status = 403)) {
        return redirect("/admin/login");
      } else {
        throw new Error("Something unexpected happened");
      }
    } else {
      throw new Error("Server unavailable");
    }
  }
}
