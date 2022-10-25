import { Provider } from "react-redux";
interface ReduxProviderProps {
  children: React.ReactNode;
  store: any;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children, store }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
