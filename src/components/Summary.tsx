import { createMemo, Show } from 'solid-js';
import { A } from 'solid-start';
import { NewsResponse } from '~/routes';
import { PostResponse } from '~/routes/post/[id]';

type Props = {
  item: PostResponse | NewsResponse;
};

export function Summary(props: Props) {
  const showCommentLink = createMemo(() => !props.item.isPost);
  const showContent = createMemo(() => "content" in props.item);

  return (
    <div>
      <h2 class="font-medium">
        <a href={props.item.url} target="_blank" class="hover:underline">
          {props.item.title}
        </a>
        <span class="font-normal text-sm text-zinc-500">
          {" "}
          ({props.item.domain})
        </span>
      </h2>
      <p class="text-sm text-zinc-500">
        {props.item.points} points by {props.item.user} {props.item.time_ago}{" "}
        <Show when={showCommentLink()}>
          |{" "}
          <A class="hover:underline" href={`/post/${props.item.id}`}>
            {props.item.comments_count} comments
          </A>
        </Show>
      </p>
      <Show when={showContent()}>
        <div class="text-sm text-zinc-500">
          {/* TODO: Fix */}
          <div innerHTML={(props.item as PostResponse).content} />
        </div>
      </Show>
    </div>
  );
}
