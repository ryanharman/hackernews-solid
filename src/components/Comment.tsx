import { createSignal, For, Show } from 'solid-js';
import { Comment } from '~/routes/post/[id]';

type Props = {
  comment: Comment;
  nestedLevel: number;
};

export function CommentRender(props: Props) {
  const [isOpen, setIsOpen] = createSignal(props.nestedLevel < 3);

  function toggleOpen() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div class="ml-4">
      <h3 class="font-medium text-sm">
        {props.comment.user} {props.comment.time_ago}{" "}
        <button onclick={toggleOpen}>[-]</button>
      </h3>
      <Show
        when={isOpen()}
        fallback={
          <button
            class="text-sm text-zinc-500 hover:underline"
            onclick={toggleOpen}
          >
            Read comment(s)
          </button>
        }
      >
        <div
          class="font-light text-md mt-2"
          contentEditable="inherit"
          innerHTML={props.comment.content}
        />
        <div class="ml-6 space-y-4 mt-4">
          <Show
            when={props.comment.comments && props.comment.comments.length > 0}
          >
            <For each={props.comment.comments}>
              {(nestedComment) => (
                <CommentRender
                  comment={nestedComment}
                  nestedLevel={
                    // If current one is defaulted to open we reset the nested level
                    props?.nestedLevel === 3 ? 0 : props.nestedLevel + 1
                  }
                />
              )}
            </For>
          </Show>
        </div>
      </Show>
    </div>
  );
}
