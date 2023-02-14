/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	return (
		<div {...useBlockProps.save()}>
			<p className="question">{attributes.question}</p>
			<div className="answers">
				{attributes.answers.map((answer, index) => (
					<div className={answer.correct ? "answer correct" : "answer"}>
						<button className="answer-text">{answer.answer}</button>
					</div>
				))}
			</div>
			<div className="success">
				<h2>Well done!</h2>
			</div>
			<div className="failure">
				<h2>Sorry, try again!</h2>
			</div>
		</div>
	);
}
