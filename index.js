const root = document.querySelector('.react-root');
const h = React.createElement;

let blogsArray = [
    {id: '1', title: 'Coding for Conservation', author: 'Sarah Henderson', body: 'Working on the CS First team, I love finding ways to get more kids involved with computer science at a young age. Though when I was a kid growing up in Miami, I spent most of my time off computers and on the water, admiring the natural beauty of the surrounding beaches and mangrove forests.'},
    {id: '2', title: 'Get Coachella-ready with a little help from Google Home', author: 'Polly Zuber', body: 'It’s almost time for Coachella-goers to descend upon the desert. At Google, we’ve been cooking up a few ways to help you get festival-ready, so you won’t miss a beat. Using your Google Home, Mini, Max or the Google Assistant on your phone, here’s what happens when you say “Hey Google, talk to Coachella.”'},
    {id: '3', title: 'A new partnership to drive renewable energy growth in the U.S.', author: 'Gary Demasi', body: 'In our global search to find renewable energy for our data centers, we’ve long wanted to work with the state of Georgia. Solar is abundant and cost-competitive in the region, but until now the market rules did not allow companies like ours to purchase renewable energy. We’re pleased to announce that in partnership with Walmart, Target, Johnson & Johnson, and Google, the state of Georgia has approved a new program that would allow companies to buy renewable energy directly through the state’s largest utility, Georgia Power. Through this program, Google will procure 78.8 megawatts (MW) of solar energy for our Douglas County, Georgia data center, as part of our effort to utilize renewable energy in every market where we operate. As we build and expand data centers and offices to meet growing demand for Google’s products, we constantly add renewable energy to our portfolio to match 100 percent of our energy use.'}
];

let blogBeingEdited = null;

let Header = () => h('header', null, 'React')
let Footer = () => h('footer', null, 'Copyright 2018')


let DeleteButton = blog => {
    let id = blog.id
    return h('button', {
        className: 'red-flag',
        onClick: () => {
            blogsArray = blogsArray.filter(post => post.id !== id);
        update();    
    }}, 'Remove Blog');
    
}
let editBlog = blogToEdit => {
    blogBeingEdited = Object.assign ({}, blogToEdit);
    update();
}

let updateTitle = (blogToEdit, title) => {
    blogToEdit.title = title
}

let updateBody = (blogToEdit, body) => {
    blogToEdit.body = body
}

let beingEdited = () => {
    return h('form', {}, [
        h('input', {value: blogBeingEdited.title, onChange: (event) => {
            updateTitle(blogBeingEdited, event.target.value)
            update();
        }}),
        h('input', {value: blogBeingEdited.body, onChange: (event) => {
            updateBody(blogBeingEdited, event.target.value)
            update();
        }}),
        SaveButton()
    ])
}

let save = () => {
    let blog = blogsArray.find( blog => {
        return blog.id === blogBeingEdited.id
    })
    Object.assign(blog, blogBeingEdited);
    console.log(blogBeingEdited, blog)
    update();
}

let SaveButton = () => {
    return h('button', {onClick: (event) => {
        event.preventDefault(); 
        save()
        }
    },'save')
}

let EditButton = blog => 
    h('button', {
        className: 'edit',
        onClick: () => {
            editBlog(blog);
        }, 
    }, 'Edit Blog');

let BlogRow = (props) => 
        h('div', null, [
            h('h4', null, props.title),
            h('p', null, props.author),
            h(DeleteButton, props),
            h(EditButton, props),
            blogBeingEdited && blogBeingEdited.id === props.id && h(beingEdited, null , []),
            h('p', null, props.body)
    ]);

let BlogList = (props) => h('div', null, 
    props.blogs.map(post => h(BlogRow, post))
    );


let Page = (props) => h('div', null, [
    h(Header, null, []),
    h(BlogList, props, []),
    h(Footer, null, [])
]);

let update = () => {
    ReactDOM.render(h(Page, {blogs: blogsArray}, []), root);
}

update();

