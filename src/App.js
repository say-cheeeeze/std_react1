import './App.css';

function App() {
	const topicList = [
		{ id : 1, title : 'html', body : 'html is...'},
		{ id : 2, title : 'css', body : 'css is...'},
		{ id : 3, title : 'js', body : 'javascript is...'},
	]
	return (
		<div className="rootDiv">
			<Header title="WEB"/>
			<Nav list={topicList}></Nav>
			<Article title="Welcome" body="Hello, WEB" />
		</div>
	);
}

function Header( props ) {
	return (
		<header>
			<h1>
				<a href="/">{ props.title }</a>
			</h1>
		</header>
	)
	
}

function Nav( props ) {
	const list = [];
	for( let item of props.list ) {
		list.push( <li key={item.id} id={item.id}><a href={'/read/' + item.id}>{ item.title }</a></li> );
	}
	
	return <nav>
		<ol>
			{ list }
		</ol>
	</nav>;
}

function Article( prop ) {
	return (
		<article>
			<h2>{ prop.title }</h2>
			{ prop.body }
		</article>
	)
}

export default App;
