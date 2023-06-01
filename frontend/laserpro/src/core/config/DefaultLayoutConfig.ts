import type LayoutConfigTypes from "@/core/config/LayoutConfigTypes";

const config: LayoutConfigTypes = {
  general: {
    mode: "system",
    iconsType: "duotone",
  },
  main: {
    type: "default",
    primaryColor: "#009EF7",
    logo: {
      dark: "media/logos/default-dark.svg",
      light: "media/logos/default.svg",
    },
  },
  illustrations: {
    set: "dozzy-1",
  },
  scrollTop: {
    display: true,
  },
  header: {
    display: true,
    menuIcon: "keenthemes",
    width: "fluid",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  toolbar: {
    display: false,
    width: "fluid",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  pageTitle: {
    display: true,
    breadcrumb: true,
    direction: "column",
  },
  aside: {
    display: true,
    theme: "dark",
    fixed: true,
    menuIcon: "keenthemes",
    minimized: false,
    minimize: true,
    hoverable: true,
  },
  content: {
    width: "fixed",
  },
  footer: {
    width: "fluid",
  },
};

export default config;
