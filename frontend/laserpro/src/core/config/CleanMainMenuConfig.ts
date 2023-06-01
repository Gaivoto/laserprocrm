export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const AdmMainMenuConfig: Array<MenuItem> = [
  {
    heading: "Dashboard",
    route: "/dashboard",
    keenthemesIcon: "home",
    bootstrapIcon: "bi-app-indicator",
  },
  {
    heading: "Materiais",
    route: "/materiais",
    keenthemesIcon: "archive",
    bootstrapIcon: "bi-app-indicator",
  },
  {
    heading: "Fornecedores",
    route: "/fornecedores",
    keenthemesIcon: "truck",
    bootstrapIcon: "bi-app-indicator",
  },
  {
    heading: "Compras",
    route: "/compras",
    keenthemesIcon: "dollar",
    bootstrapIcon: "bi-app-indicator",
  },
  {
    heading: "Utilizadores",
    route: "/utilizadores",
    keenthemesIcon: "user",
    bootstrapIcon: "bi-app-indicator",
  },
];

const UserMainMenuConfig: Array<MenuItem> = [
  {
    heading: "Dashboard",
    route: "/dashboard",
    keenthemesIcon: "home",
    bootstrapIcon: "bi-app-indicator",
  },
  {
    heading: "Materiais",
    route: "/materiais",
    keenthemesIcon: "archive",
    bootstrapIcon: "bi-app-indicator",
  },
  {
    heading: "Fornecedores",
    route: "/fornecedores",
    keenthemesIcon: "truck",
    bootstrapIcon: "bi-app-indicator",
  },
  {
    heading: "Compras",
    route: "/compras",
    keenthemesIcon: "dollar",
    bootstrapIcon: "bi-app-indicator",
  },
];

export default {
  AdmMainMenuConfig: AdmMainMenuConfig,
  UserMainMenuConfig: UserMainMenuConfig
}
