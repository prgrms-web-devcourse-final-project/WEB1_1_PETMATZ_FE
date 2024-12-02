import RootLayout from '@/layouts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
    ChangePassword,
    Chat,
    ChatDetail,
    DeleteAccount,
    ForgotPassword,
    Home,
    Intro,
    Login,
    Match,
    Please,
    Profile,
    Register,
    Signup,
    SOS,
    SOSWrite,
    Ranking,
} from '@/pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthGaurd } from '@/components/auth';
import DogEdit from './pages/DogEdit';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                pauseOnHover={false}
                hideProgressBar
                closeOnClick
                style={{
                    minWidth: 'fit-content',
                }}
            />
            <Routes>
                <Route element={<RootLayout layout={true} />}>
                    <Route element={<AuthGaurd />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/sos" element={<SOS />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/please" element={<Please />} />
                        <Route path="/match" element={<Match />} />
                    </Route>
                </Route>
                <Route element={<RootLayout layout={false} />}>
                    <Route index={true} path="/" element={<Intro />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route element={<AuthGaurd />}>
                        <Route
                            path="/change-password"
                            element={<ChangePassword />}
                        />
                        <Route
                            path="/delete-account"
                            element={<DeleteAccount />}
                        />
                        <Route
                            path="/chat/:chatRoomId"
                            element={<ChatDetail />}
                        />
                        <Route path="/sos/write" element={<SOSWrite />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/ranking" element={<Ranking />} />
                        <Route path="/dog-edit/:id" element={<DogEdit />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
