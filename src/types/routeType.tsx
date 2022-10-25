export interface routeType {
  path: string;
  component: React.ReactNode;
  children?: routeType[];
}
