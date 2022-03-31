import axios from "axios";
import QueryStringParams from "../model/QueryStringParams";
import Shoutout from "../model/Shoutout";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getShoutouts = async (
  params: QueryStringParams
): Promise<Shoutout[]> => {
  return (await axios.get(baseURL, { params })).data;
};
//axios accesses to baseURL with the request(params) and display the data in the browser?

export const addShoutout = async (shoutout: Shoutout): Promise<Shoutout> => {
  return (await axios.post(baseURL, shoutout)).data;
};

export const deleteShoutout = async (id: string): Promise<void> => {
  return (await axios.delete(`${baseURL}/${encodeURIComponent(id)}`)).data;
};

//why it gives Promise type? or What is the meanign of type of Promise??
//http method
