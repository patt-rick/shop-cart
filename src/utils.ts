export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return null;
};

export const validateRequired = (value: string, field: string): string | null => {
    if (!value.trim()) return `${field} is required`;
    return null;
};
