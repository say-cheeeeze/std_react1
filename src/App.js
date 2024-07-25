import './App.css';
import { useState } from 'react';

function App() {
	
	const [ mode, setMode ] = useState( 'WELCOME' );
	const [ id, setId ] = useState( null );
	const [ nextId, setNextId ] = useState( 4 );
	const [ topicList, setTopicList ] = useState( [
		{ id : 1, title : 'HTML', body : 'html is...' },
		{ id : 2, title : 'CSS', body : 'css is...' },
		{ id : 3, title : 'javascript', body : 'javascript is...' },
	] );
	
	let title = 'WELCOME';
	let body = 'Hello, WEB';
	let content = <Article title={ title } body={ body }/>;
	let controlContent = null;
	
	if ( mode === 'READ' ) {
		title = topicList.filter( item => item.id === id )[ 0 ].title;
		body = topicList.filter( item => item.id === id )[ 0 ].body;
		
		content = <Article title={ title } body={ body }/>;
		controlContent = <li>
			<a href={ "/update/" + id } onClick={ event => {
				event.preventDefault();
				setMode( 'UPDATE' );
			} }>수정
			</a>
		</li>;
	}
	else if ( mode === 'CREATE' ) {
		content = <Create onCreate={ ( title, body ) => {
			let _topicList = [ ...topicList ];
			_topicList.push( {
				id    : nextId,
				title : title,
				body  : body,
			} );
			setTopicList( _topicList );
			setMode( 'READ' );
			setId( nextId );
			setNextId( nextId + 1 );
		} }></Create>;
	}
	else if ( mode === 'UPDATE' ) {
		let topicInfo = topicList.filter( item => item.id === id )[0];
		title = topicInfo.title;
		body = topicInfo.body;
		content = <Update title={ title }
		                  body={ body }
		                  onUpdate={(title,body)=> {
							  let _topicList = [ ...topicList ];
							  topicInfo = _topicList.filter( item => item.id === id )[0];
							  topicInfo.title = title;
							  topicInfo.body = body;
			                  setTopicList( _topicList );
			                  setMode( 'READ' );
		
		}}></Update>
	}
	
	return (
		<div className="rootDiv">
			<Header title="WEB" onChangeMode={ () => {
				setMode( 'WELCOME' );
			} }/>
			<Nav list={ topicList } onChangeMode={ ( _id ) => {
				setMode( 'READ' );
				setId( _id );
			} }></Nav>
			{ content }
			<div className="controllArea" style={ { marginTop : '10px' } }>
				<ul>
					<li>
						<a href="/create" onClick={ event => {
							event.preventDefault();
							setMode( 'CREATE' );
						} }>추가
						</a>
					</li>
					{ controlContent }
				</ul>
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

function Update( props ) {
	return (
		<article>
			<h2>수정</h2>
			<form onSubmit={ e => {
				e.preventDefault();
				let title = document.getElementById( 'formTitle' ).value;
				let body = document.getElementById( 'formBody' ).value;
				props.onUpdate( title, body );
			}}>
				<div>
					<input type="text" id="formTitle" name="title" placeholder="title" defaultValue={ props.title }/>
				</div>
				<div>
					<textarea name="body" id="formBody" defaultValue={ props.body } placeholder="body"></textarea>
				</div>
				<div>
					<button type="submit" id="formValue" value="update">수정</button>
				</div>
			</form>
		</article>
	);
}

export default App;
