import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Events,
  EventVisitors,
  Header,
  Login,
  Management,
  NotFoundPage,
  Visitors,
} from "..";
import { EditVisitor } from "../Visitors/EditVisitor";

export const MainRouter = () => {
  // const [isAuth, setIsAuth] = useState(true);

  // const isAuthed = () => {
  //   if (!localStorage.getItem("token")) {
  //     return setIsAuth(false);
  //   }
  //   return setIsAuth(true);
  // };

  // useEffect(() => {
  //   isAuthed();
  //   if (!isAuth) {
  //     return window.location.assign(`./`);
  //   }
  // }, []);

  // console.log(isAuth);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/management" element={<Management />} />
        <Route path="/events" element={<Events />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/visitors/edit-visitor/:id" element={<EditVisitor />} />

        <Route path="/events/event-visitors/:id" element={<EventVisitors />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
