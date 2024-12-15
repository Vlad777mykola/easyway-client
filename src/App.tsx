import Upload from './ui-components/Upload/Upload';
import './App.css';

function App() {
	return (
		<>
			<Upload
				name="avatar"
				listType="picture-circle"
				showUploadList={false}
				action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
			/>
		</>
	);
}

export default App;
