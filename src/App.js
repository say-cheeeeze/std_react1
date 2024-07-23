import './App.css';
import { useState } from 'react';

function App() {
	
	const [ mode, setModeFunc ] = useState( 'WELCOME' );
	const [ id, setId ] = useState( null );
	const [ nextId, setNextId ] = useState(4);
	const [ topicList, setTopicList ] = useState( [
		{ id : 1, title : 'HTML', body : 'html is...' },
		{ id : 2, title : 'CSS', body : 'css is...' },
		{ id : 3, title : 'javascript', body : 'javascript is...' },
	] );
	
	let title = 'WELCOME';
	let body = 'Hello, WEB';
	let content = <Article title={title} body={body}/>;
	
	if ( mode === 'READ' ) {
		for( let i = 0; i < topicList.length; i++ ) {
			if ( topicList[i].id === id ) {
				title = topicList[i].title;
				body = topicList[i].body;
			}
		}
		content = <Article title={title} body={body}/>;
	}
	else if ( mode === 'CREATE' ) {
		content = <Create onCreate={ (title,body) => {
			let _topicList = [ ...topicList ];
			_topicList.push( {
				id : nextId,
				title : title,
				body : body,
			});
			setNextId( nextId + 1 );
			setTopicList( _topicList );
		}}></Create>;
	}
	
	return (
		<div className="rootDiv">
			<Header title="WEB" onChangeMode={ () => {
				setModeFunc( 'WELCOME' );
			} }/>
			<Nav list={ topicList } onChangeMode={ ( _id ) => {
				setModeFunc( 'READ' );
				setId( _id );
			} }></Nav>
			{ content }
			
			<div className="createArea" style={{marginTop:'10px'}}>
				<a href="/create" onClick={ event => {
					event.preventDefault();
					setModeFunc( 'CREATE' );
				} }>추가(Create)</a>
			</div>
			
		</div>
	);
}

function Header( props ) {
	return (
		<header>
			<h1>
				<a href="/" onClick={ props.onChangeMode }>{ props.title }</a>
			</h1>
		</header>
	)
}

function Nav( props ) {
	const list = [];
	for ( let item of props.list ) {
		list.push(
			<li key={ item.id } id={ item.id } onClick={ e => {
				e.preventDefault();
				props.onChangeMode( item.id );
			} }>
				<a href={ '/read/' + item.id }>{ item.title }</a>
			</li>
		);
	}
	
	return <nav>
		<ol>{ list }</ol>
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

function Create( props ) {
	return (
		<article>
			<h2>Create(추가)</h2>
			<form onSubmit={ e => {
				e.preventDefault();
				let title = document.getElementById( 'formTitle' ).value;
				let body = document.getElementById( 'formBody' ).value;
				let value = document.getElementById( 'formValue' ).value;
				props.onCreate( title, body );
			}}>
				<div>
					<input type="text" id="formTitle" name="title" placeholder="title"/>
				</div>
				<div>
					<textarea name="body" id="formBody" placeholder="body"></textarea>
				</div>
				<div>
					<button type="submit" id="formValue" value="Create">create</button>
				</div>
			</form>
		</article>
	);
}

export default App;
