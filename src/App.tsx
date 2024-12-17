import Navbar from './layouts/Navbar/Navbar';
import {
	CommentOutlined,
	UserOutlined,
	StrikethroughOutlined,
	MoonOutlined,
} from '@ant-design/icons';
import './App.css';

const leftItems = [
	{
		href: '/',
		children: <StrikethroughOutlined className="logo" />,
		isModal: false,
	},
];

const rightItems = [
	{
		href: '/chat',
		children: <CommentOutlined className="logo" />,
		isModal: false,
	},
	{
		href: '',
		children: <UserOutlined className="logo" />,
		isModal: true,
	},
	{
		href: '/theme',
		children: <MoonOutlined className="logo" />,
		isModal: false,
	},
];

function App() {
	return (
		<>
			<Navbar isSticky leftItems={[...leftItems]} rightItems={[...rightItems]} />
		</>
	);
}

export default App;
