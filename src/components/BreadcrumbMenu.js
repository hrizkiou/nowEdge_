import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {encrypt} from '../helpers/crypto';

const BreadcrumbMenu = (props) => {
  const {t} = useTranslation();

  switch (props.name) {
    case 'Dashboard':
      return (
        <Breadcrumb className="mb-0 pb-0">
          <BreadcrumbItem className="mb-0 pb-0" active>
            {t('breadcrumbMenu.modules')}{' '}
          </BreadcrumbItem>
        </Breadcrumb>
      );

    case 'ListQuiz':
      return (
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/Dashboard">{t('breadcrumbMenu.modules')} </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={`/module/${encrypt(props.module.moduleInstanceId)}`}>
              {props.module.moduleName}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {t('breadcrumbMenu.listQuiz')}{' '}
          </BreadcrumbItem>
        </Breadcrumb>
      );

    case 'ModuleDetail':
      return (
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/Dashboard">{t('breadcrumbMenu.modules')} </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{props.module.moduleName}</BreadcrumbItem>
          <BreadcrumbItem active>
            {t('breadcrumbMenu.ListesNotions')}{' '}
          </BreadcrumbItem>
        </Breadcrumb>
      );
    case 'ConfigModule':
      return (
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/moderator/modules">{t('breadcrumbMenu.modules')} </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/moderator/modules">{props.module.moduleName}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {t('breadcrumbMenu.manageConfig')}
          </BreadcrumbItem>
        </Breadcrumb>
      );
    case 'ModuleSessions':
      return (
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/moderator/modules">{t('breadcrumbMenu.modules')} </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/moderator/modules">{props.module.moduleName}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{t('breadcrumbMenu.sessions')}</BreadcrumbItem>
        </Breadcrumb>
      );
    case 'ModuleNotions':
      return (
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/moderator/modules">{t('breadcrumbMenu.modules')} </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/moderator/modules">{props.module.moduleName}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              to={`/moderator/modules/${encrypt(
                props.selectedConfig.moduleAffectationId,
              )}/config`}>
              {props.selectedConfig.moduleInstanceName}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Notions</BreadcrumbItem>
        </Breadcrumb>
      );
    case 'QuizConfigModule':
      return (
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/moderator/modules">{t('breadcrumbMenu.modules')} </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/moderator/modules">{props.module.moduleName}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              to={`/moderator/modules/${encrypt(
                props.selectedConfig.moduleAffectationId,
              )}/config`}>
              {props.selectedConfig.moduleInstanceName}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Quiz</BreadcrumbItem>
        </Breadcrumb>
      );
    case 'StudentManagement':
      return (
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/moderator/modules">{t('breadcrumbMenu.modules')} </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/moderator/modules">{props.module.moduleName}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {props.selectedSession.trainingSessionName}
          </BreadcrumbItem>
        </Breadcrumb>
      );
    case 'ModeratorModules':
      return (
        <Breadcrumb>
          <BreadcrumbItem>{t('breadcrumbMenu.modules')}</BreadcrumbItem>
        </Breadcrumb>
      );

    case 'businessGame':
      return (
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/moderator/modules">{t('breadcrumbMenu.modules')} </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              to={`/moderator/modules/${encrypt(
                props.module.moduleId,
              )}/config`}>
              {props.module.moduleName}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {props.selectedConfig.moduleInstanceName}
          </BreadcrumbItem>
        </Breadcrumb>
      );

    default:
      return <></>;
  }
};

const mapStateToProps = (state) => {
  const {module} = state.Module;
  const {selectedConfig} = state.Configuration;
  const {selectedSession} = state.Session;
  return {module, selectedConfig, selectedSession};
};

export default connect(mapStateToProps, {})(BreadcrumbMenu);
