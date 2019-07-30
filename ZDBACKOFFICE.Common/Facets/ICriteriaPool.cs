﻿using System;
using System.Linq.Expressions;

namespace ZDBACKOFFICE
{
    public interface ICriteriaPool<T>
    {
        ICriteriaPool<T> Add(Expression<Func<T, bool>> predicate);
        ICriteriaPool<T> Add(Expression<Func<T, bool>> predicate, bool @if);
        ICriteriaPool<T> With(Action<ICriteriaPool<T>> pipe);
    }
}
