/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const isUserOrOrgPage = repoName.endsWith(".github.io");
const basePath = isGithubPagesBuild && repoName && !isUserOrOrgPage ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

module.exports = nextConfig;
