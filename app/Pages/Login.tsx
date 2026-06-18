
function App() {
  return (
    <div className=".bg-light-subtle">
        <div className="border border-secondary bg-dark text-light w-25 p-3 rounded mx-auto mt-5 shadow">
            <form action="POST" id="formLogin">
                <label htmlFor="Email" className='form-label'>Email:</label>
                <input type="text" className='form-control' placeholder="Your Email goes here"/>
                <label htmlFor="Password" className='form-label'>Password:</label>
                <input type="password" className='form-control' placeholder="Your Password goes here"/>
                <button type="submit" className='btn btn-primary mt-2'>LogIn</button>
            </form>
        </div>
    </div>
    
  );
}
export default App; 