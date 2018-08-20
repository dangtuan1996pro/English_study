class Admin::Reading::ParagraphQuestionsController < ApplicationController
  layout "admin/application"
  before_action :find_question_type, except: %i(index new create)

  def new
    @question_type = QuestionType.new topic_id: Topic.codes[:paragraph]
    Settings.Admin.paragraph_question.num_question
            .times{@question_type.questions.build}
    @question_type.questions.each do |question|
      Settings.Admin.paragraph_question.num_answer
              .times{question.answers.build}
    end
  end

  def create
    @question_type = QuestionType.new question_type_params
    @question_type.topic_id = Topic.codes[:paragraph]
    if @question_type.save
      flash[:success] = t ".flash_success"
      redirect_to admin_reading_reading_questions_url
    else
      render :new
    end
  end

  def edit; end

  def update
    if @question_type.update_attributes question_type_params
      flash[:success] = t ".flash_success"
      redirect_to admin_reading_reading_questions_url
    else
      render :edit
    end
  end

  private

  def question_type_params
    params.require(:question_type).permit :content,
      questions_attributes: [:id, :title,
      answers_attributes: [:id, :content, :truth]]
  end

  def find_question_type
    @question_type = QuestionType.find_by id: params[:id]
    return if @question_type
    flash[:notice] = t "admin.writing.writing_questions.update.flash_notice"
    redirect_to admin_reading_reading_questions_url
  end
end
