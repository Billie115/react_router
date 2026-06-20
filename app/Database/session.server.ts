import { createCookieSessionStorage, redirect } from "react-router";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session", //random onoma mporw na to balw kai mpampis einai afto pou fenetai sto browser(onoma tou cookie)
        secrets: [process.env.SECRET!], //sthn ousia upografh gia thn egkirothta tou cookie wste na mhn to pira3oune
        sameSite: "lax", //einai gia protection se periptwsh attack kanontas xrhsh 3rd party sites, alla axristo gia thn dikia mou fahs
        httpOnly: true, // apotrepei XSS attacks kai to kanei etsi wste javascript den mporei na kanei er8ei se epafh me ta cookies
        secure: process.env.NODE_ENV === "production", //to kanei etsi wste ta cookies na stelnontai mono se HTTPS, oso kaneis akomh to site mporeis na xrhshmopoihseis to In development  
    }
})

export async function createUserSession(email: string, redirectTo: string) {
    const session = await sessionStorage.getSession();
    session.set("userEmail", email); //apo8hkebei to session to userEmail(onoma, mporeis na to peis kai mpampis) kai to email
    return redirect(redirectTo, { //kanei redirect se oti page 8eloume emeis 
        headers: { //kai meta me to header set-cookie tou leme apo8hkefse to cookie sto browser kai xrhshmopoihse to opote 8es
            "Set-Cookie": await sessionStorage.commitSession(session)
        }
    });
}

export async function requireUserSession(request: Request) {
    const session = await sessionStorage.getSession( //pernei to string tou Cookie kai to kanei verify me ton kwdiko pou exoume sto .env
        request.headers.get("Cookie") //diabazei to Cookie apo to Browser
    );
    const email = session.get("userEmail"); //pernei to email me to opoio o xrhsths ekane log in(an ekane log in, dld px na balei apef8eias to url, tote einai undefined)
    if (!email){
        throw redirect("/login"); // an o kwdikos den teriazei(.env) | to cookie ekane expire | kapoios exei pseftiko cookie | h den exei cookie genika to throw ton dioxnei apef8eias kai stamataei amesa to loading ths sellidas
    }
    return email; //ligo perito gia thn periptosh mas, sthn ousia girnaei to email pou einai logged in kai mporoume na to kanoume oti 8eloume
}

export async function destroyUserSession(request: Request) { //to request: Request akomh den katalaba ti einai alla den pirazei
    const session = await sessionStorage.getSession(
        request.headers.get("Cookie") //kanei request apo to browser to cookie
    );
    return redirect("/Login", { //se kanei redirect sto login
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session) //kai kanei destroy to cookie
        }
    });
}