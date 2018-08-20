class Admin::Writing::WritingQuestionsController < ApplicationController
  layout "admin/application"
  before_action :find_question, except: %i(index new create)
  before_action :not_belong_to_exam, only: %i(destroy)

  def index
    @question_type_writing = GetAllQuestionTypeByTopic
                             .call Topic.codes[:writing]
  end

  def new
    @question = Question.new
    @question.answers.new
  end

  def create
    question_type = QuestionType.new topic_id: Topic.codes[:writing]
    @question = question_type.questions.build question_params
    if @question.save
      flash[:success] = t ".flash_success"
      redirect_to admin_writing_writing_questions_url
    else
      render :new
    end
  end

  def edit; end

  def update
    if @question.update_attributes question_params
      flash[:success] = t ".flash_success"
      redirect_to admin_writing_writing_questions_url
    else
      render :edit
    end
  end

  def destroy
    @question.question_type&.destroy
    flash[:success] = t ".flash"
    redirect_to request.referrer || root_url
  end

  private

  def question_params
    params.require(:question).permit :title,
      answers_attributes: [:id, :content, :truth]
  end

  def find_question
    @question = Question.find_by id: params[:id]
    return if @question
    flash[:notice] = t "admin.writing.writing_questions.update.flash_notice"
    redirect_to admin_writing_writing_questions_url
  end

  def not_belong_to_exam
    @question.question_type.exam_id.nil?
  end
end
