import React from 'react';

const Blogs = () => {
    return (
        <div>
            <div className='container mx-auto bg-white mt-14 shadow-xl rounded-lg p-9'>
                <header>
                    <h1 className='text-5xl text-center mb-5 font-semibold'>Blog</h1>
                </header>
                <section>
                    <h1 className='text-4xl mb-4'>What are the different ways to manage a state in a React application?</h1>
                    <div className='text-2xl'>
                        <p>There are four main types of state you need to properly manage in your React apps:

                            Local state
                            Global state
                            Server state
                            URL state
                            Let's cover each of these in detail:

                            Local (UI) state – Local state is data we manage in one or another component.

                            Local state is most often managed in React using the useState hook.

                            For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs.

                            Global (UI) state – Global state is data we manage across multiple components.

                            Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.

                            A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application.

                            Sometimes state we think should be local might become global.

                            Server state – Data that comes from an external server that must be integrated with our UI state.

                            Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.

                            There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.</p>
                    </div>
                </section><br /><br />
                <section>
                    <h1 className='text-4xl mb-4'>How does prototypical inheritance work?</h1>
                    <div className='text-2xl'>
                        <p>Simply put, prototypical inheritance refers to the ability to access object properties from another object. We use a JavaScript prototype to add new properties and methods to an existing object constructor. We can then essentially tell our JS code to inherit properties from a prototype.</p>
                    </div>
                </section><br /><br />
                <section>
                    <h1 className='text-4xl mb-4'>What is a unit test? Why should we write unit tests?</h1>
                    <div className='text-2xl'>
                        <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                    </div>
                </section><br /><br />
                <section>
                    <h1 className='text-4xl mb-4'>React vs. Angular vs. Vue?</h1>
                    <div className='text-2xl'>
                        <p>React is a UI library, Angular is a fully-fledged front-end framework, while Vue. js is a progressive framework. They can be used almost interchangeably to build front-end applications, but they're not 100 percent the same, so it makes sense to compare them and understand their differences.</p>
                    </div>
                </section><br /><br />
            </div>
        </div>
    );
};

export default Blogs;