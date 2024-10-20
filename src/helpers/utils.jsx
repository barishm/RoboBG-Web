export const cleanFormValues = values => {
    return Object.entries(values).reduce((acc, [key, value]) => {
        if (value === "" || value === "N/A") {
            return { ...acc, [key]: null };
        } else if (typeof value === "object" && value !== null) {
            return { ...acc, [key]: cleanNestedValues(value) };
        }
        return { ...acc, [key]: value };
    }, {});
};

export const cleanNestedValues = obj => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value === "" || value === "N/A") {
            return { ...acc, [key]: null };
        } else if (typeof value === "object" && value !== null) {
            return { ...acc, [key]: cleanNestedValues(value) };
        }
        return { ...acc, [key]: value };
    }, {});
};