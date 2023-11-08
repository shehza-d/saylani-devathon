export const getUrl = () => {
  const isProduction = window.location.href.includes("https");

  const baseUrl = isProduction
    ? "https://devathon-api-dot-learning-chatbot-393109.lm.r.appspot.com"
    : "http://localhost:3005";

  return baseUrl;
};
