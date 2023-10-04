#!/usr/bin/env python

#-----------------------------------------------------------------------
# database.py
# Author: Jarrett Kirk
#-----------------------------------------------------------------------

from sqlalchemy import create_engine, Column, Integer, String, text, PickleType, DateTime, ForeignKey, UniqueConstraint, func, Boolean, delete, BINARY, event
from sqlalchemy.orm import sessionmaker, Session, relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import sys
import pickle

#-----------------------------------------------------------------------

# Initilizations
engine = create_engine("postgresql://advisordb_user:vgmFHFBTvy4gGBMKaX3PRiU1CBlY5yje@dpg-ch3e4al269v61fa81eag-a.oregon-postgres.render.com/advisordb")
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

#-----------------------------------------------------------------------

# # define the Jobs class to map to the 'jobs' table
# class Jobs(Base):
#     __tablename__ = 'jobs'
#     job_id = Column(Integer, primary_key=True)
#     title = Column(String(127))
#     description = Column(String(225))
#     class_year = Column(String(100))
#     dept = Column(String(100))
#     professor_id = Column(Integer, ForeignKey('professors.professor_id', ondelete='CASCADE'))
#     dynamic_app = relationship("DynamicApps", back_populates="job", uselist=False)
#     departments = relationship("Departments", back_populates="jobs", secondary="jobsdepartment")
#     professor = relationship("Professors", back_populates="jobs", uselist=False)
 
#-----------------------------------------------------------------------

# def get_job_by_id(id):
#     try:
#         job = session.query(Jobs).filter_by(job_id=id).first()

#     except Exception as ex:
#         print("tigeradvisors.py:" + str(ex), file=sys.stderr)
#         error_msg = "A server error occurred. "
#         error_msg += "Please contact the system administrator."
#         return error_msg, 1
    
#     return job, 0

#-----------------------------------------------------------------------
