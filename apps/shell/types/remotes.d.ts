declare module 'mf_auth/AuthApp' {
  type AuthAppProps = {
    initialAuthenticated?: boolean;
    onAuthChange?: (isAuthenticated: boolean) => void;
  };

  const Component: React.ComponentType<AuthAppProps>;
  export default Component;
}

declare module 'mf_dashboard/DashboardApp' {
  type DashboardAppProps = {
    isAuthenticated?: boolean;
  };

  const Component: React.ComponentType<DashboardAppProps>;
  export default Component;
}

declare module 'mf_products/ProductsApp' {
  type ProductsAppProps = {
    isAuthenticated?: boolean;
  };

  const Component: React.ComponentType<ProductsAppProps>;
  export default Component;
}
