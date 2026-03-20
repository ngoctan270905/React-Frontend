type GreetingProps = {
    isLoggedIn: boolean;
};

export const Greeting = ({ isLoggedIn }: GreetingProps) => {
    let message;
   if (isLoggedIn) {
        message = <h1>Welcome back!</h1>;
   } else {
        message = <h1>Please sign up.</h1>;
   }
   return <div>{message}</div>;
}