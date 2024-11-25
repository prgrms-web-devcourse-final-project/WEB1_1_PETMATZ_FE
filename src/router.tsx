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
    Signup,
    SOS,
    SOSWrite,
} from '@/pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/sos" element={<SOS />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/please" element={<Please />} />
                    <Route path="/match" element={<Match />} />
                </Route>
                <Route element={<RootLayout layout={false} />}>
                    <Route index={true} path="/" element={<Intro />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/chat/:roomId" element={<ChatDetail />} />
                    <Route path="/sos/write" element={<SOSWrite />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/change-password"
                        element={<ChangePassword />}
                    />
                    <Route path="/delete-account" element={<DeleteAccount />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
