/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";

import { Button } from "@wordpress/components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { question, answers } = attributes;

	return (
		<div {...useBlockProps()}>
			{console.log(answers)}
			<RichText
				tagName="p"
				placeholder={__("Type your question...", "create-block")}
				value={question}
				onChange={(value) => setAttributes({ question: value })}
				className="question"
			/>

			<div className="answers">
				{answers.map((answer, index) => (
					<div className="answer">
						<RichText
							tagName="button"
							className="answer-text"
							placeholder={__("Type your answer...", "create-block")}
							value={answer.answer}
							onChange={(value) => {
								const newAnswers = [...answers];
								newAnswers[index] = {
									answer: value,
									correct: answer.correct,
								};
								setAttributes({ answers: newAnswers });
							}}
						/>
						{answer.correct ? (
							<Button
								variant="link"
								onClick={() => {
									const newAnswers = [...answers];
									console.log(newAnswers);
									newAnswers[index].correct = false;
									setAttributes({ answers: newAnswers });
								}}
							>
								<FontAwesomeIcon icon={faStarSolid} />
							</Button>
						) : (
							<Button
								variant="link"
								onClick={() => {
									const newAnswers = [...answers];
									console.log(newAnswers);
									newAnswers[index].correct = true;
									setAttributes({ answers: newAnswers });
								}}
							>
								<FontAwesomeIcon icon={faStarRegular} />
							</Button>
						)}
						<Button
							variant="secondary"
							onClick={() => {
								const newAnswers = [...answers];
								newAnswers.splice(index, 1);
								setAttributes({ answers: newAnswers });
							}}
						>
							{__("Remove Answer", "create-block")}
						</Button>
					</div>
				))}
				<Button
					variant="primary"
					onClick={() => {
						const newAnswers = [...answers];
						newAnswers.push({ answer: "", correct: false });
						setAttributes({ answers: newAnswers });
					}}
				>
					{__("Add Answer", "create-block")}
				</Button>
			</div>
		</div>
	);
}
