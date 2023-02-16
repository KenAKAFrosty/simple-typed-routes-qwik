import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
    const loc = useLocation();

    return (<main>
        <h1>Team for {loc.params.name}</h1>
    </main>)
})