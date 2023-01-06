import { component$, useStylesScoped$, useStore } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import style from './nav.scss?inline';

export default component$(() => {
  useStylesScoped$(style);

  const { pathname } = useLocation();

  const state = useStore({
    pages: [
      { name: 'Home', route: '/' },
      { name: 'Todo List', route: '/todo/' },
    ],
  });

  return (
    <nav>
      {state.pages.map((page) => (
        <Link href={page.route} key={page.route}>
          <span class={pathname === page.route && 'active'}>{page.name}</span>
        </Link>
      ))}
    </nav>
  );
});
