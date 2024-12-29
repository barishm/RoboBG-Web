// import { useNavigate } from "react-router-dom";

export const cleanFormValues = (values) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    if (value === "" || value === "N/A") {
      return { ...acc, [key]: null };
    } else if (typeof value === "object" && value !== null) {
      return { ...acc, [key]: cleanNestedValues(value) };
    }
    return { ...acc, [key]: value };
  }, {});
};

export const cleanNestedValues = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === "" || value === "N/A") {
      return { ...acc, [key]: null };
    } else if (typeof value === "object" && value !== null) {
      return { ...acc, [key]: cleanNestedValues(value) };
    }
    return { ...acc, [key]: value };
  }, {});
};

export const getRobotIdsFromUrl = (search) => {
  const params = new URLSearchParams(search);
  const ids = params.get("id");
  return ids ? ids.split(",").map((id) => parseInt(id, 10)) : [];
};

export const addIdToUrl = (search, newId, navigate) => {
  const params = new URLSearchParams(search);
  const ids = getRobotIdsFromUrl(search);

  if (!ids.includes(newId)) {
    ids.push(newId);
  }
  params.set("id", ids.join(","));
  navigate(`?${decodeURIComponent(params.toString())}`);
};

export const removeIdFromUrl = (search, idToRemove,navigate) => {
  const params = new URLSearchParams(search);
  const ids = getRobotIdsFromUrl(search);

  const filteredIds = ids.filter((id) => id !== idToRemove);
  if (filteredIds.length > 0) {
    params.set("id", filteredIds.join(","));
  } else {
    params.delete("id");
  }
  navigate(`?${decodeURIComponent(params.toString())}`);
};
