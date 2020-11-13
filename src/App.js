import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
	const [songs, setSongs] = useState([]);
	const [playlists, setPlaylists] = useState([]);
	const [rosters, setRosters] = useState([]);

	const getRoster = async () => {
		const res = await axios.get('http://localhost:3000/rosters');
		const data = res.data;
		console.log(data);
		setRosters(data);
	};

	const getSongs = async () => {
		const res = await axios.get('http://localhost:3000/songs');
		const data = res.data;
		setSongs(data);
	};

	const getPlaylists = async () => {
		const res = await axios.get('http://localhost:3000/playlists');
		const data = res.data;
		// console.log(data);
		setPlaylists(data);
	};

	useEffect(() => {
		getRoster();
		getSongs();
		getPlaylists();
	}, []);

	const songList = songs
		? songs.map((song) => {
				return (
					<div>
						<p>{song.title}</p>
						<p>{song.artist}</p>
					</div>
				);
		  })
		: null;

	const playlistList = playlists
		? playlists.map((playlist) => {
				return (
					<div>
						<p>{playlist.title}</p>
					</div>
				);
		  })
		: null;

	const rosterList = rosters
		? rosters.map((roster, index) => {
				return (
					<div key={index}>
						<span>Playlist: {roster.playlist.title} --</span>
						<span> Song: {roster.song.title}</span>
					</div>
				);
		  })
		: null;

	return (
		<div className='App'>
			<div>
				<b>All Songs: </b>
				{songList}
			</div>
			<p>
				<b>All Playlists: </b>
				{playlistList}
			</p>
			<p>
				<b>Playlists with songs: </b>
				{rosterList}
			</p>
		</div>
	);
}

export default App;
